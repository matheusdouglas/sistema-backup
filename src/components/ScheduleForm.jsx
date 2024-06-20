import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ScheduleForm = () => {
  const [fileHandle, setFileHandle] = useState(null);
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [schedule, setSchedule] = useState('');

  const handleFileSelection = async () => {
    try {
      const [handle] = await window.showOpenFilePicker();
      setFileHandle(handle);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDirectorySelection = async () => {
    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSchedule = async () => {
    try {
      if (fileHandle && directoryHandle && schedule) {
        const file = await fileHandle.getFile();
        const newFileHandle = await directoryHandle.getFileHandle(file.name, { create: true });
        const writable = await newFileHandle.createWritable();
        
        const now = new Date();
        const scheduledTime = new Date(schedule);

        const delay = scheduledTime - now;

        if (delay > 0) {
          setTimeout(async () => {
            await writable.write(file);
            await writable.close();
            alert('Backup completo com sucesso');
          }, delay);
        } else {
          alert('The scheduled time is in the past. Please choose a future time.');
        }
      } else {
        alert('Please select a file, a destination directory, and a schedule time');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <Container>
      <Title>Agendar Backup</Title>
      <Button onClick={handleFileSelection}>Escolher Objeto de Backup</Button>
      <Button onClick={handleDirectorySelection}>Escolher Destino</Button>
      <Input
        type="datetime-local"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <Button onClick={handleSchedule}>Agendar Backup</Button>
    </Container>
  );
}

export default ScheduleForm;
