import { Box, Container } from "@mantine/core";
import OfferList from "@components/Offers/OfferList";

const sx1 = (theme) => ({
  borderRadius: "4px",
  backgroundColor: theme.colors.dark[6],
});

function App() {
  return (
    <Container>
      <Box sx={sx1} p="2rem" mt="5rem" component="main">
        <OfferList />
      </Box>
    </Container>
  );
}

export default App;
