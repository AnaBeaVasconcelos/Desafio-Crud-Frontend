import { EditIcon, DeleteIcon, UnlockIcon, NotAllowedIcon } from "@chakra-ui/icons";
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
import Swal from "sweetalert2";

export const Products = () => {

  async function getProducts() {
    const response = await api.get("/api/products/");
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
        <Button margin="10px" onClick={() => [setDataEdit({}), onOpen()]} variant='solid' _hover={{ bgGradient: 'linear-gradient(to right, #21d4fd, #b721ff)' }} bgGradient='linear-gradient(to left, #21d4fd, #b721ff)' color='#fff'>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" boxShadow="0px 0px 11px 5px aliceblue" borderRadius="20px">
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
                  Ações
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody textAlign="center">
              {data.map(({ name, description, price, quantity, category, is_active, id }, index) => (
                <Tr color="#fff" key={index} cursor="pointer " _hover={{ bgGradient: 'linear-gradient(to left, #21d4fd, #b721ff)' }}>
                  <Td maxW={isMobile ? 5 : 100}>{id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{description}</Td>
                  <Td maxW={isMobile ? 5 : 100}>R$ {price}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{quantity} Unidades</Td>
                  <Td maxW={isMobile ? 5 : 100}>{category.name}</Td>
                  <Td p={0} justifyContent="center">
                    {is_active ? (
                      <UnlockIcon
                        margin="10px"
                        fontSize={20}
                        onClick={() => {
                          api.put(`/api/products/block/${id}`, { is_active: false });
                          getProducts();
                        }}
                      />
                    ) : (
                      <NotAllowedIcon
                        margin="10px"
                        fontSize={20}
                        onClick={() => {
                          api.put(`/api/products/block/${id}`, { is_active: true });
                          getProducts();
                        }}
                      />
                    )}
                    <EditIcon margin="10px"
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, description, price, quantity, category, is_active, id }),
                        onOpen(),
                      ]}

                    />
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => {
                        Swal.fire({
                          title: 'Tem certeza que deseja excluir?',
                          text: "Você não poderá reverter isso!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Sim, excluir!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            api.delete(`/api/products/${id}`);
                            getProducts();
                            Swal.fire(
                              'Excluído!',
                              'O produto foi excluído.',
                              'success'
                            )
                            window.location.reload();
                          }
                        })
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {
        isOpen && (
          <ModalComp
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )
      }
    </Flex >
  );
};