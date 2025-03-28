# WebService
WebService for our e-commerce page

# Architecture

/src
    /adapters # Server adapters
    /application 
        /useCases # Business logic for entity operations
            /x entity
                /x entity operation
                    IXController.ts # Handles http requests and responses
                    IXDTO.ts # Shapes the data received on the request
                    IXUseCase.test.ts # Unit tests
                    IXUseCase.ts # UseCase interface
                    index.html # Composer Facilitator
        /validators # Validation Helper Functions
    /domain -> Concepts and Business Rules looking for solve problems related to the specified context
        /entities # Core business models.
        /providers  
            /externals  # Core providers models.
            /repositories # Contracts for External Services.
        /repositories # Contracts for data access.
        /services # Internal logic for complex entity operations
    /infra 
        /db                 # Database
        /providers_implementation    # Implementations of provider contracts
        /repositories_implementation # Implementations of repository contracts
        /services_implementation     # Implementations of service contracts
    /routes                # Defines application routes
    /server                # Implements the server
    /tests -> Integrated and End2End Tests
    application.ts