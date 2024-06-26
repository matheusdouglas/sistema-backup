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

const BackupForm = () => {
  const [fileHandle, setFileHandle] = useState(null);
  const [directoryHandle, setDirectoryHandle] = useState(null);

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

  const handleBackup = async () => {
    try {
      if (fileHandle && directoryHandle) {
        const file = await fileHandle.getFile();
        const newFileHandle = await directoryHandle.getFileHandle(file.name, { create: true });
        const writable = await newFileHandle.createWritable();
        await writable.write(file);
        await writable.close();
        alert('Backup completo com sucesso');
      } else {
        alert('Por favor selecione o diretorio e o destino');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <Container>
      <Title>Dados para backup</Title>
      <Button onClick={handleFileSelection}>Escolher Objeto de Backup</Button>
      <Button onClick={handleDirectorySelection}>Escolher Destino</Button>
      <Button onClick={handleBackup}>Fazer Backup</Button>
    </Container>
  );
}

export default BackupForm;
