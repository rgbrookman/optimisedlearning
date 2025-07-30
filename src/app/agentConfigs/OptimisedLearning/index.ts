import quizzer from "./quizzer";
import { PianoTeacher, philosopher, ReactTeacher, ScorecardExpert } from "./mentors";

import { injectTransferTools } from "../utils";

philosopher.downstreamAgents = [quizzer];
PianoTeacher.downstreamAgents = [quizzer];
ReactTeacher.downstreamAgents = [quizzer];
ScorecardExpert.downstreamAgents = [quizzer];


const agents = injectTransferTools([
ReactTeacher, philosopher, PianoTeacher, quizzer, ScorecardExpert
]);

export default agents;