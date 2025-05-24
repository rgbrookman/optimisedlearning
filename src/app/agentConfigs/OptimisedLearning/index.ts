import quizzer from "./quizzer";
import { PianoTeacher, philosopher, ReactTeacher } from "./mentors";

import { injectTransferTools } from "../utils";

philosopher.downstreamAgents = [quizzer];
PianoTeacher.downstreamAgents = [quizzer];
ReactTeacher.downstreamAgents = [quizzer];


const agents = injectTransferTools([
ReactTeacher, philosopher, PianoTeacher, quizzer
]);

export default agents;