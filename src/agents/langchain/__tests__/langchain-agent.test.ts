import { LangChainAgent } from "../langchain-agent";
import { createTestConfig, createTestGraphConfig } from "../../../__tests__/setup";
import { Tool } from "@langchain/core/tools";

describe("LangChainAgent", () => {
  let agent: LangChainAgent;

  beforeEach(() => {
    agent = new LangChainAgent(createTestConfig());
  });

  describe("constructor", () => {
    it("should create an agent with default configuration", () => {
      expect(agent).toBeDefined();
    });

    it("should create an agent with custom tools", () => {
      const tools: Tool[] = [
        // Add mock tools here
      ];
      const agentWithTools = new LangChainAgent({
        ...createTestConfig(),
        tools,
      });
      expect(agentWithTools).toBeDefined();
    });
  });

  describe("createGraph", () => {
    it("should create a graph with the provided configuration", () => {
      const graphConfig = createTestGraphConfig();
      const graph = agent.createGraph(graphConfig);
      expect(graph).toBeDefined();
      expect(graph.run).toBeDefined();
    });

    it("should handle conditional edges", () => {
      const graphConfig = {
        ...createTestGraphConfig(),
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