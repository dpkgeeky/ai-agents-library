import { OllamaAgent } from "../ollama-agent";
import { createTestConfig } from "../../../__tests__/setup";
import { Tool } from "@langchain/core/tools";
import { AgentType } from "../../../core/agent-factory";

describe("OllamaAgent", () => {
  let agent: OllamaAgent;

  beforeEach(() => {
    agent = new OllamaAgent({
      ...createTestConfig(),
      type: AgentType.OLLAMA,
      model: "llama2",
    });
  });

  describe("constructor", () => {
    it("should create an agent with default configuration", () => {
      expect(agent).toBeDefined();
    });

    it("should create an agent with custom configuration", () => {
      const customAgent = new OllamaAgent({
        type: AgentType.OLLAMA,
        model: "llama2",
        baseUrl: "http://localhost:11434",
        temperature: 0.5,
        maxTokens: 1000,
      });
      expect(customAgent).toBeDefined();
    });

    it("should create an agent with custom tools", () => {
      const tools: Tool[] = [
        // Add mock tools here
      ];
      const agentWithTools = new OllamaAgent({
        ...createTestConfig(),
        type: AgentType.OLLAMA,
        tools,
      });
      expect(agentWithTools).toBeDefined();
    });
  });

  describe("createGraph", () => {
    it("should create a graph with the provided configuration", () => {
      const graphConfig = {
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
      const graph = agent.createGraph(graphConfig);
      expect(graph).toBeDefined();
      expect(graph.run).toBeDefined();
    });

    it("should handle conditional edges", () => {
      const graphConfig = {
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
        ],
        edges: [
          {
            from: "input",
            to: "process",
            condition: (state: any) => state.shouldProcess,
          },
        ],
      };
      const graph = agent.createGraph(graphConfig);
      expect(graph).toBeDefined();
    });
  });

  describe("run", () => {
    it("should process input and return a response", async () => {
      const input = "Hello, how are you?";
      const response = await agent.run(input);
      expect(response).toBeDefined();
      expect(typeof response).toBe("string");
      expect(response.length).toBeGreaterThan(0);
    });

    it("should handle errors gracefully", async () => {
      const input = "";
      await expect(agent.run(input)).rejects.toThrow();
    });
  });
}); 