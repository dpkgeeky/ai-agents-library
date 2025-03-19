import { AgentFactoryImpl, createAgent } from "../agent-factory";
import { createTestConfig } from "../../__tests__/setup";
import { LangChainAgent } from "../../agents/langchain/langchain-agent";

describe("AgentFactory", () => {
  let factory: AgentFactoryImpl;

  beforeEach(() => {
    factory = new AgentFactoryImpl();
  });

  describe("createAgent", () => {
    it("should create a LangChain agent", () => {
      const config = createTestConfig();
      const agent = factory.createAgent(config);
      expect(agent).toBeInstanceOf(LangChainAgent);
    });

    it("should create an agent with the provided configuration", () => {
      const config = createTestConfig();
      const agent = factory.createAgent(config);
      expect(agent).toBeDefined();
    });
  });
});

describe("createAgent", () => {
  it("should create a LangChain agent using the factory function", () => {
    const config = createTestConfig();
    const agent = createAgent(config);
    expect(agent).toBeInstanceOf(LangChainAgent);
  });
}); 