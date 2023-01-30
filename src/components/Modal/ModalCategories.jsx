import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";
import Swal from "sweetalert2";
import './style.css';

export const ModalCategories = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");

  function sendOnEnter (e) {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  async function handleSave() {

    if (name === "" || name === " ") {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
      })
      return;
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? await api.post("/api/categories/", { name })
      : await api.put(`/api/categories/${dataEdit.id}`, { name });

    try {
      if (newDataArray.status === 201) {
        setData(newDataArray);
        Swal.fire({
          icon: 'success',
          title: 'Categoria criada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        })
      } if (newDataArray.status === 200) {
        setData(newDataArray);
        Swal.fire({
          icon: 'success',
          title: 'Categoria editada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado!',
      })
    }

    console.log(newDataArray);
    onClose();
  };

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  onKeyPress={sendOnEnter} backgroundColor="#111" boxShadow="0 10px 10px  rgb(255, 255, 255)"  color="#fff">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="end">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};