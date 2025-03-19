import { ChatOpenAI } from "@langchain/openai";
import { AgentConfig } from '../core/interfaces';
import { AgentType } from '../core/agent-factory';

export const createTestLLM = () => {
  return new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
};

export function createTestConfig(): AgentConfig {
  return {
    type: AgentType.LANGCHAIN,
    verbose: true,
    tools: [],
  };
}

export const createTestGraphConfig = () => {
  return {
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
          prompt: "Test prompt",
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
  };
}; 