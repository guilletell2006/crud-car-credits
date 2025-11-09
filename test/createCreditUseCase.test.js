jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid-123"),
}));

const createCreditUseCaseFactory = require("../src/application/useCases/createCreditUseCase");

const mockCreditRepository = {
  save: jest.fn(async (credit) => credit), 
};


const createCredit = createCreditUseCaseFactory(mockCreditRepository);

describe("CreateCreditUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("creation of a valid credit", async () => {
    const data = {
      idClient: "13539225",
      clientName: "Héctor Dueñas",
      phoneNumber: "3001234567",
      vehicle: { plate: "ABC123", brand: "Toyota", model: "Corolla" },
      creditAmount: 20000000,
      installments: 12,
      installmentValue: 1800000,
    };

    const result = await createCredit(data);

    expect(result).toHaveProperty("id", "mocked-uuid-123");
    expect(result.idClient).toBe("13539225");
    expect(result.clientName).toBe("Héctor Dueñas");
    expect(mockCreditRepository.save).toHaveBeenCalledTimes(1);
  });

  test("throws an error if required fields are missing", async () => {
    const data = { idClient: "13539225" }; 

    await expect(createCredit(data)).rejects.toThrow("Missing client data");
    expect(mockCreditRepository.save).not.toHaveBeenCalled();
  });
});
