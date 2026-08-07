import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface UserData {
  email: string;
  addedAt: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newEmail, setNewEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'allowed_users'));
      const usersData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data() as UserData);
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newEmail) return;
    const emailToAdd = newEmail.trim().toLowerCase();
    try {
      await setDoc(doc(db, 'allowed_users', emailToAdd), {
        email: emailToAdd,
        addedAt: new Date().toISOString(),
        role: 'member'
      });
      setNewEmail('');
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("추가 실패. 권한이 부족할 수 있습니다.");
    }
  };

  const handleDeleteUser = async (email: string) => {
    if (!window.confirm(`${email} 계정의 권한을 삭제하시겠습니까?`)) return;
    try {
      await deleteDoc(doc(db, 'allowed_users', email));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("삭제 실패. 권한이 부족할 수 있습니다.");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        ⚙️ 멤버 접근 권한 관리 (Whitelist)
      </Typography>
      
      <Card sx={{ mb: 4, p: 2, boxShadow: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            새로운 멤버 구글 이메일 추가
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              label="구글 이메일 주소" 
              variant="outlined" 
              size="small" 
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
            <Button variant="contained" onClick={handleAddUser}>추가</Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            현재 접속 허용된 멤버 목록
          </Typography>
          <List>
            {users.map((u) => (
              <ListItem 
                key={u.email}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDeleteUser(u.email)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={u.email} secondary={`추가된 날짜: ${new Date(u.addedAt).toLocaleDateString()}`} />
              </ListItem>
            ))}
            {users.length === 0 && <Typography color="text.secondary">조회된 멤버가 없습니다.</Typography>}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
