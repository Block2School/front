import { Grid, Box, Text } from "@chakra-ui/react"
import ScoreCard from "../../scoreboard/scoreCard"

export default function ListScores ({score}:{score:any}) {

    return (
      <Grid>
        <Box alignItems="baseline">
          <Text as='b' fontSize='3xl' color='#ffe6c4'> My ScoreBoard</Text>
        </Box>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          {score.data.map((score:any, index:number) => (
            <ScoreCard key={index} language={score.language} characters={score.characters} lines={score.lines}/>
          ))}
        </Grid>
      </Grid>
    )
}