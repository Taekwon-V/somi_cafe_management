import { useEffect, useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, TextField, 
  Button, IconButton, Paper, Divider, Chip
} from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CampaignIcon from '@mui/icons-material/Campaign';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: string;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: any;
  createdBy: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData: Task[] = [];
      snapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !user?.email) return;
    
    try {
      await addDoc(collection(db, 'tasks'), {
        content: newTask.trim(),
        status: 'todo',
        createdAt: serverTimestamp(),
        createdBy: user.email
      });
      setNewTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Task['status']) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("이 할 일을 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Stats for the summary cards
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;



  const renderKanbanColumn = (title: string, status: Task['status'], color: string) => {
    const columnTasks = tasks.filter(t => t.status === status);
    
    return (
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid #e0e0e0', minHeight: 400 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 1, borderBottom: `2px solid ${color}` }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>{title}</Typography>
            <Chip label={columnTasks.length} size="small" sx={{ bgcolor: color, color: 'white', fontWeight: 'bold' }} />
          </Box>
          
          {columnTasks.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              비어있습니다.
            </Typography>
          )}

          {columnTasks.map(task => (
            <Card key={task.id} sx={{ mb: 2, boxShadow: 1, '&:hover': { boxShadow: 3 } }}>
              <CardContent sx={{ p: '16px !important' }}>
                <Typography variant="body1" sx={{ mb: 1.5, wordBreak: 'break-word' }}>
                  {task.content}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: '100px' }}>
                    {task.createdBy.split('@')[0]}
                  </Typography>
                  
                  <Box>
                    {status !== 'todo' && (
                      <IconButton size="small" onClick={() => handleUpdateStatus(task.id, status === 'done' ? 'in-progress' : 'todo')}>
                        <ArrowBackIcon fontSize="small" />
                      </IconButton>
                    )}
                    {status !== 'done' && (
                      <IconButton size="small" onClick={() => handleUpdateStatus(task.id, status === 'todo' ? 'in-progress' : 'done')}>
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton size="small" color="error" onClick={() => handleDeleteTask(task.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          환영합니다, {user?.email?.split('@')[0]}님! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          현재 창업 준비 현황을 확인해보세요.
        </Typography>
      </Box>
      
      {/* 1. 상단 요약 대시보드 */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* 해야 할 일 카드 */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.4)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, opacity: 0.9, mb: 1 }}>
                    해야 할 일
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {todoCount}건
                  </Typography>
                </Box>
                <ChairIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 진행 중인 일 카드 */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.4)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, opacity: 0.9, mb: 1 }}>
                    진행 중인 일
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {inProgressCount}건
                  </Typography>
                </Box>
                <LocalCafeIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 완료된 일 카드 */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, opacity: 0.9, mb: 1 }}>
                    완료된 일
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {doneCount}건
                  </Typography>
                </Box>
                <CampaignIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* 2. 하단 할 일 관리 (칸반 보드) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          📌 실무 할 일 관리 (Kanban)
        </Typography>
        
        <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
          <TextField 
            size="small" 
            placeholder="새로운 할 일을 입력하세요..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ minWidth: { sm: 300 }, bgcolor: 'white' }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!newTask.trim()}
            startIcon={<AddIcon />}
          >
            추가
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {renderKanbanColumn('할 일 (To-Do)', 'todo', '#f44336')}
        {renderKanbanColumn('진행 중 (In Progress)', 'in-progress', '#ff9800')}
        {renderKanbanColumn('완료 (Done)', 'done', '#4caf50')}
      </Grid>
      
    </Box>
  );
}
