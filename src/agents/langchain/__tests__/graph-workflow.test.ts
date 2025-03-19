import { LangChainAgent } from "../langchain-agent";
import { createTestConfig, createTestGraphConfig } from "../../../__tests__/setup";

describe("Graph Workflow", () => {
  let agent: LangChainAgent;

  beforeEach(() => {
    agent = new LangChainAgent(createTestConfig());
  });

  describe("workflow execution", () => {
    it("should execute a basic workflow", async () => {
      const graphConfig = createTestGraphConfig();
      const workflow = agent.createGraph(graphConfig);
      const result = await workflow.run({
        input: "Test input",
      });
      expect(result).toBeDefined();
      expect(result.output).toBeDefined();
    });

    it("should handle state transitions", async () => {
      const graphConfig = {
        ...createTestGraphConfig(),
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
              prompt: "Process the input",
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
      const workflow = agent.createGraph(graphConfig);
      const result = await workflow.run({
        input: "Test input",
      });
      expect(result).toBeDefined();
      expect(result.state).toBeDefined();
    });

    it("should handle conditional edges", async () => {
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
      const workflow = agent.createGraph(graphConfig);
      const result = await workflow.run({
        input: "Test input",
        shouldProcess: true,
      });
      expect(result).toBeDefined();
    });
  });

  describe("error handling", () => {
    it("should handle invalid node configurations", () => {
      const invalidConfig = {
        ...createTestGraphConfig(),
        nodes: [
          {
            id: "invalid",
            type: "unknown",
            config: {},
          },
        ],
      };
      expect(() => agent.createGraph(invalidConfig)).toThrow();
    });

    it("should handle invalid edge configurations", () => {
      const invalidConfig = {
        ...createTestGraphConfig(),
        edges: [
          {
            from: "nonexistent",
            to: "process",
          },
        ],
      };
      expect(() => agent.createGraph(invalidConfig)).toThrow();
    });
  });
}); 