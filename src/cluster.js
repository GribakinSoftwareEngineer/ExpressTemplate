import cluster from "node:cluster";
import {availableParallelism} from "node:os";

import createApp from "./index.js";


if(cluster.isPrimary){
    const numCPU = availableParallelism();
    console.log(`Processor count: ${numCPU}`);
    for(let i = 0; i < numCPU; i++){
        cluster.fork();
    }
}
else{
    await createApp();
}