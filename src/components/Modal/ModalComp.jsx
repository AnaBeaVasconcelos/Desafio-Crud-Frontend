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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";
import Swal from "sweetalert2";
import './style.css';


export const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [description, setDescription] = useState(dataEdit.description || "");
  const [price, setPrice] = useState(dataEdit.price || "");
  const [quantity, setQuantity] = useState(dataEdit.quantity || "");
  const [category, setCategory] = useState(dataEdit.category || "");
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const response = await api.get("/api/categories/");
    setCategories(response.data.response);
  }

  function maskPrice(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{1,2})$/, ".$1")
      .replace(/(?=(\d{3})+(\D))\B/g, ".");
  }

  function sendOnEnter (e) {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  async function handleSave() {

    if (name === "" || description === "" || price === "" || quantity === "") {
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

    if (isNaN(category) || category === "") {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        icon: 'error',
        title: 'Oops...',
        text: 'Selecione uma categoria!',
      })
      return;
    }


    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, description, price, quantity, category };
    }


    const newDataArray = !Object.keys(dataEdit).length
      ? await api.post("/api/products/", { name, description, price, quantity, category_id: category })
      : await api.put(`/api/products/${dataEdit.id}`, { name, description, price, quantity, category_id: category })


    try {
      if (newDataArray.status === 201) {
        setData(newDataArray);
        Swal.fire({
          customClass: {
            container: 'my-swal'
          },
          icon: 'success',
          title: 'Produto criado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        })
        return;
      } if (newDataArray.status === 200) {
        setData(newDataArray);
        Swal.fire({
          icon: 'success',
          title: 'Produto editado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        })
        return;
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado!',
      })
      return;
    }


    onClose();
  };

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    getCategories();
    loadStorage();
  }, []);

  return (
    <>
      <Modal class='modal' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent   onKeyPress={sendOnEnter} backgroundColor="#111" boxShadow="0 10px 10px  rgb(255, 255, 255)"  color="#fff">
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
              <Box>
                <FormLabel>Descrição</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Preço</FormLabel>
                <Input
                  type="text"
                  value={price}
                  onChange={
                    (e) => {
                      if (isNaN(e.target.value) && e.target.value !== ".") {
                        Swal.fire({
                          customClass: {
                            container: 'my-swal'
                          },
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Digite apenas números e ponto!',
                        })
                        return;
                      }
                      setPrice(maskPrice(e.target.value))
                    }

                  }
                  onKeyUp={(e) => setPrice(maskPrice(e.target.value))}
                />
              </Box>
              <Box>
                <FormLabel>Quantidade</FormLabel>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Categoria</FormLabel>
                <Select placeholder='Selecione uma categoria' onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Select>
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