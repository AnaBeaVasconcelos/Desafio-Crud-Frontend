import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { ModalComp } from "../../components/Modal/ModalComp";

export const Products = () => {

  async function getProducts() {
    const response = await api.get("/api/products/");
    console.log(response.data.response);

    setData(response.data.response);
  }

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    loadStorage();
    getProducts();
  }, []);

    // useEffect(() => {
  //   const db_costumer = localStorage.getItem("cad_produto")
  //     ? JSON.parse(localStorage.getItem("cad_produto"))
  //     : [];

  //   setData(db_costumer);
  // }, [setData]);

  // const handleRemove = (email) => {
  //   const newArray = data.filter((item) => item.email !== email);

  //   setData(newArray);

  //   localStorage.setItem("cad_produto", JSON.stringify(newArray));
  // };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });


  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      fontSize="20px"
      fontFamily="poppins"
      backgroundColor="#111"
      boxShadow="0 10px 10px  rgb(255, 255, 255)"
    >
      <Box w="95%" h="100vh" py={10}>
        <Button onClick={() => [setDataEdit({}), onOpen()]} variant='solid' _hover={{ bgGradient: 'linear-gradient(to right, #21d4fd, #b721ff)' }} bgGradient='linear-gradient(to left, #21d4fd, #b721ff)' color='#fff'>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto">
          <Table mt="6">
            <Thead textAlign="center">
              <Tr>
              <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Id
                </Th>
                <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Nome
                </Th>
                <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Descrição
                </Th>
                <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Preço
                </Th>
                <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Quantidade
                </Th>
                <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Categoria
                </Th>
                <Th color="#fff" maxW={isMobile ? 5 : 80} fontSize="20px">
                  Ativo
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody textAlign="center">
              {data.map(({ name, description, price, quantity, category_id, is_active, id }, index) => (
                <Tr color="#fff" key={index} cursor="pointer " _hover={{ bgGradient: 'linear-gradient(to left, #21d4fd, #b721ff)' }}>
                  <Td maxW={isMobile ? 5 : 100}>{id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{description}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{price}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{quantity}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{category_id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{is_active}</Td>
                  <Td p={0} justifyContent  ="center">
                    <EditIcon margin="10px"
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, description, price, quantity, category_id, is_active, id }),
                        onOpen(),
                      ]}

                    />
                    <DeleteIcon
                      fontSize={20}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};