import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import ImportDialog from './ImportDialog';
import { useBoolean } from 'react-hanger';
import ProfessorSelectionContext from '../../../contexts/ProfessorSelectionContext';

function ImportButton({ onClose }) {
  const fileInputRef = useRef();

  const [fileContent, setFileContent] = useState(undefined);
  const importModalOpen = useBoolean(false);

  const [professors, setProfessors] = useState(undefined);

  function onFileChange({ target }) {
    const file = target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFileContent(fileReader.result);
    };

    fileReader.readAsText(file, 'utf-8');
    importModalOpen.setTrue();
  }

  function closeAll() {
    importModalOpen.setFalse();
    onClose();
  }

  useEffect(() => {
    if (fileContent == undefined) setProfessors(undefined);
    else setProfessors(processFile(fileContent));
  }, [fileContent]);

  function processFile(content) {
    const professors = content
      .split('\r\n')
      .splice(1)
      .map((line) => {
        const items = line.split(',');

        return {
          id: items[0],
          name: items[1],
          email: items[2],
          role: 'PROFESSOR',
        };
      });

    return professors;
  }

  return (
    <>
      <Button onClick={() => fileInputRef.current?.click()}>Importar</Button>
      <input hidden type="file" ref={fileInputRef} onChange={onFileChange} />

      <ProfessorSelectionContext professors={professors}>
        <ImportDialog
          open={importModalOpen.value}
          onClose={importModalOpen.setFalse}
          onCloseAll={closeAll}
        />
      </ProfessorSelectionContext>
    </>
  );
}

export default ImportButton;
