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

export const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [description, setDescription] = useState(dataEdit.description || "");
  const [price, setPrice] = useState(dataEdit.price || "");
  const [quantity, setQuantity] = useState(dataEdit.quantity || "");
  const [category_id, setCategory_id] = useState(dataEdit.category_id || "");
  const [is_active, setIs_active] = useState(dataEdit.is_active || "");

  async function editProduct (){

    const response = await api.put(`/api/products/${dataEdit.id}`, {
      name,
      description,
      price,
      quantity,
      category_id,
      is_active
    });
  


    // if (!name || !email) return;

    // if (emailAlreadyExists()) {
    //   return alert("E-mail já cadastrado!");
    // }
  
   
    


    // if (Object.keys(dataEdit).length) {
    //   data[dataEdit.index] = { name, description, price, quantity, category_id, is_active };
    // }

    // const newDataArray = !Object.keys(dataEdit).length
    //   ? [...(data ? data : []), { name, description, price, quantity, category_id, is_active }]
    //   : [...(data ? data : [])];

      

    // localStorage.setItem("cad_produto", JSON.stringify(newDataArray));

    // setData(newDataArray);

    // onClose();
  };

  // const emailAlreadyExists = () => {
  //   if (dataEdit.email !== email && data?.length) {
  //     return data.find((item) => item.email === email);
  //   }



  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
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
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Quantidade</FormLabel>
                <Input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type="text"
                  value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Ativo</FormLabel>
                <Input
                  type="text"
                  value={is_active}
                  onChange={(e) => setIs_active(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={editProduct}>
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