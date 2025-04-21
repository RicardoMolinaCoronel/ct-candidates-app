import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Container } from '@mui/material';
import LoginWrapper from './components/wrappers/LoginWrapper';
import RegisterWrapper from './components/wrappers/RegisterWrapper';
import TasksWrapper from './components/wrappers/TasksWrapper';
import ProtectedRoute from './components/routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Routes>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/register" element={<RegisterWrapper />} />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TasksWrapper />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
