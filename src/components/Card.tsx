import theme from "../theme";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function GroupCard({ name, id }: { name: string; id: string }) {
  return (
    <Card
      sx={{
        maxWidth: 460,
        width: "100%",
        borderColor: theme.palette.secondary.main,
        "&:nth-of-type(odd)": {
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main,
        },
        backgroundColor: theme.palette.secondary.main,
      }}
      variant="outlined"
    >
      <Link to={`groups/${id}`} style={{ textDecoration: "none" }}>
        <CardContent
          sx={{
            width: "100%",
            paddingX: "0.3125rem",
            paddingY: "0.5rem",
            "&::first-letter": {
              textTransform: "uppercase",
            },
            color: theme.palette.secondary.contrastText,
            textWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5">{name}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
