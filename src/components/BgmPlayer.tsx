import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';

export default function BgmPlayer() {
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // 적절한 배경음악 볼륨
      if (playing) {
        audioRef.current.play().catch((err) => {
          console.error("오디오 재생 실패 (브라우저 차단 등):", err);
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

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

      {/* 로컬 MP3 파일 재생 (브라우저 차단 무시) */}
      <audio ref={audioRef} src="/bgm.mp3" loop />
    </Box>
  );
}
