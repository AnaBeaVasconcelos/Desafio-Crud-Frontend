import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Heading
} from '@chakra-ui/react';

{/* <>
<Card m={4} maxW='sm' boxShadow='base' p='6' rounded='md' bg='white'>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Heading fontSize={18}>Produtos cadastrados no sistema</Heading>
      <Text color='gray.600' fontSize='2xl' textAlign={'center'}>
        {{item}}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter alignItems="center" justifyContent="center">
    <ButtonGroup>
      <Button variant='solid' colorScheme='blue'>
        Cadastrar Produto
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Ver Produtos
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</> */}

export const CardHome = ({ principal, quantidade, novo, ver }) => {
  return (
    <>
      <Card m={6} maxW='sm' boxShadow='base' p='6' rounded='md' bg='#111'>
        <CardBody>
          <Stack mt='3' spacing='3'>
            <Heading fontSize={18} color='#fff' textAlign={'center'}>{principal}</Heading>
            <Text color='#fff' fontSize='2xl' textAlign={'center'}>
              {quantidade}
            </Text>
          </Stack>
        </CardBody>
        <Divider  color='#fff'/>
        <CardFooter alignItems="center" justifyContent="center">
          <ButtonGroup>
            <Button variant='solid' _hover={{ bgGradient:'linear-gradient(to right, #21d4fd, #b721ff)' }} bgGradient='linear-gradient(to left, #21d4fd, #b721ff)' color='#fff'>
              {novo}
            </Button>
            <Button variant='ghost' _hover={{ bgGradient:'linear-gradient(to left, #21d4fd, #b721ff)' }} color='#fff'>
              {ver}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}


