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
import { ModalCategories } from "../../components/Modal/ModalCategories";
import Swal from "sweetalert2";

export const Categories = () => {

  async function getCategories() {
    const response = await api.get("/api/categories/");
    setData(response.data.response);
  }

  function deleteCategory(id) {
    api.delete(`/api/categories/${id}`).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Categoria deletada com sucesso",
          showConfirmButton: false,
          timer: 1500,
        });
        getCategories();
      }
    }
    ).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Erro ao deletar categoria",
        text: "Categoria possui produtos associados",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    );
   
  }

  function loadStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }

  useEffect(() => {
    loadStorage();
    getCategories();
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
                  Açoẽs
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody textAlign="center">
              {data.map(({ name, is_active, id }, index) => (
                <Tr color="#fff" key={index} cursor="pointer " _hover={{ bgGradient: 'linear-gradient(to left, #21d4fd, #b721ff)' }}>
                  <Td maxW={isMobile ? 5 : 100}>{id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td p={0} justifyContent="center">
                    {is_active ? (
                      <UnlockIcon
                        margin="10px"
                        fontSize={20}
                        onClick={() => {
                          api.put(`/api/categories/block/${id}`, { is_active: false });
                          getCategories();
                        }}
                      />
                    ) : (
                      <NotAllowedIcon
                        margin="10px"
                        fontSize={20}
                        onClick={() => {
                          api.put(`/api/categories/block/${id}`, { is_active: true });
                          getCategories();
                        }}
                      />
                    )}
                    <EditIcon margin="10px"
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, is_active, id }),
                        onOpen(),
                      ]}

                    />
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => {
                        Swal.fire({
                          title: 'Tem certeza que deseja deletar essa categoria?',
                          text: "Você não poderá reverter isso!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Sim, deletar!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteCategory(id);
                          }
                        }
                        )
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
          <ModalCategories
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