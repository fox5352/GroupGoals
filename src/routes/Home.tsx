// import { Typography } from "@mui/material";
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardActions from '@mui/material/CardActions';

export function GroupCard({ name, createdAt }: { name: string, createdAt: Date }) {

  console.log(name, createdAt)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader>test</CardHeader>

      <CardActions>
        <button>test</button>
      </CardActions>
    </Card>
  )
}

export default function Home() {
  return <main>
    <GroupCard name="test" createdAt={new Date()} />
  </main>;
}
