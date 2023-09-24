import { Box, useTheme } from "@mui/material";
import Header from "../../components/HeaderDashy";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../scenes/global/theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Replace with your real FAQ content
  const faqs = [
    {
      question: "How can I use the disease prediction feature?",
      answer:
        "To use the disease prediction feature, you need to log in to your account, enter your symptoms, and our system will provide you with a list of possible diseases. You can then consult with a doctor for further evaluation.",
    },
    {
      question: "How do I find the nearest doctors?",
      answer:
        "You can find the nearest doctors by entering your location in the 'Find Doctors' section. Our system will show you a list of doctors in your area, along with their contact information and available appointment slots.",
    },
    {
      question: "How can I book an appointment with a doctor?",
      answer:
        "Booking an appointment is easy. After selecting a doctor from the list, choose an available time slot that suits you and confirm your appointment. You will receive a confirmation email with all the details.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security seriously. Your personal information is encrypted and stored securely. We only share it with doctors for appointment purposes and medical consultations.",
    },
    {
      question: "Can I change my appointment?",
      answer:
        "Yes, you can change your appointment by logging in to your account and going to the 'My Appointments' section. Select the appointment you want to change and follow the instructions.",
    },
  ];

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {faqs.map((faq, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
