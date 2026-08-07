import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import ReactPlayer from 'react-player';

const Player = ReactPlayer as any;

export default function BgmPlayer() {
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={togglePlay}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: '50px',
        p: 0.5,
        pr: hover || playing ? 2.5 : 0.5,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <IconButton 
        sx={{ 
          bgcolor: playing ? '#0f172a' : '#f1f5f9',
          color: playing ? 'white' : '#64748b',
          '&:hover': {
            bgcolor: playing ? '#1e293b' : '#e2e8f0',
          },
          width: 44,
          height: 44,
          transition: 'all 0.3s ease',
        }}
      >
        {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
      </IconButton>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          overflow: 'hidden',
          width: hover || playing ? 140 : 0,
          opacity: hover || playing ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ml: hover || playing ? 1.5 : 0,
        }}
      >
        <MusicNoteRoundedIcon sx={{ fontSize: 16, mr: 0.5, color: '#64748b' }} />
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: '#1e293b',
            whiteSpace: 'nowrap',
            fontSize: '0.85rem'
          }}
        >
          Cafe Vibes BGM
        </Typography>
      </Box>

      {/* Hidden YouTube Player */}
      <Box sx={{ display: 'none' }}>
        <Player
          url="https://www.youtube.com/watch?v=Dx5qFachd3A" // Royalty-free Jazz Music Mix
          playing={playing}
          controls={false}
          width="0"
          height="0"
          volume={0.4}
        />
      </Box>
    </Box>
  );
}
