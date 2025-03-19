import { createAgent, AgentType } from "../src";
import { ChatOpenAI } from "@langchain/openai";

async function main() {
  // Create an LLM instance
  const llm = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0,
  });

  // Create an agent
  const agent = createAgent({
    llm,
    verbose: true,
  });

  // Create a simple graph workflow
  const workflow = agent.createGraph({
    nodes: [
      {
        id: "input",
        type: "input",
        config: {},
      },
      {
        id: "process",
        type: "process",
        config: {
          prompt: "Process the input and generate a response",
        },
      },
      {
        id: "output",
        type: "output",
        config: {},
      },
    ],
    edges: [
      {
        from: "input",
        to: "process",
      },
      {
        from: "process",
        to: "output",
      },
    ],
  });

  // Run the workflow
  const result = await workflow.run({
    input: "Hello, how are you?",
  });

  console.log("Workflow result:", result);
}

main().catch(console.error); 