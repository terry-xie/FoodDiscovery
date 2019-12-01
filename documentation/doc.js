module.exports = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Food Discovery",
    description:
      "Food Discovery is a REST API that retrieves restaurant data from Yelp through their API. Try it out by following these simple steps: \n" +
      "1. Register a user (POST /user) \n" +
      "2. Login with the newly registered user to obtain a token in the response (POST /session) \n" +
      "3. Use the Authorize button to attach the token to future requests and gain access to all protected routes \n" +
      "4. Get restaurant data (GET /me/generator/next)",
    contact: {
      name: "Terry Xie"
    }
  },
  servers: [
    {
      url: "/api/v1",
      description: "Test API v1 Server"
    }
  ],
  paths: {
    "/me": {
      get: {
        tags: ["me"],
        description: "Get current user",
        summary: "Get current user",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Current user retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["me"],
        description: "Update current user",
        summary: "Update current user",
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    $ref: "#/components/schemas/password"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Current user updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/me/preference": {
      get: {
        tags: ["me"],
        description: "Get preference of current user",
        summary: "Get preference of current user",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Preference retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    preferences: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Preference"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["me"],
        description:
          "Create preference for current user. Only one preference per user is supported at the moment",
        summary: "Create preference for current user",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  radius: {
                    $ref: "#/components/schemas/radius"
                  },
                  price: {
                    $ref: "#/components/schemas/price"
                  },
                  location: {
                    $ref: "#/components/schemas/location"
                  }
                },
                required: ["location"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Preference created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Preference"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          },
          "403": {
            description:
              "A preference already exists for the user. Either update or delete the existing preference",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/me/generator": {
      get: {
        tags: ["me"],
        description: "Get generator of current user",
        summary: "Get generator of current user",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Generator retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    generators: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Generator"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["me"],
        description:
          "Create generator for current user. Only one generator per user is supported at the moment",
        summary: "Create generator for current user",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  limit: {
                    $ref: "#/components/schemas/limit"
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Generator created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Generator"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/me/generator/next": {
      get: {
        tags: ["me"],
        description:
          "Get next results from generator. If no generator has been created, " +
          "a generator with default limit of 1 will be used. If no preference has " +
          "been created, a preference with default values (price=1, radius=16000, " +
          "location='San Francisco') will be used.",
        summary: "Get next results using generator of current user",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Results retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NextResult"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          },
          "403": {
            description:
              "Location is missing. Please create a preference with the desired location first before accessing this endpoint.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/session": {
      post: {
        tags: ["session"],
        description: "Create a session",
        summary: "Login with user credentials",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    $ref: "#/components/schemas/username"
                  },
                  password: {
                    $ref: "#/components/schemas/password"
                  }
                },
                required: ["username", "password"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Session created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/token"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user": {
      get: {
        tags: ["user"],
        description: "Get users",
        summary: "Get users",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Users retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    users: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/User"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["user"],
        description: "Create user",
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    $ref: "#/components/schemas/username"
                  },
                  password: {
                    $ref: "#/components/schemas/password"
                  }
                },
                required: ["username", "password"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{userId}": {
      get: {
        tags: ["user"],
        description: "Get user by id",
        summary: "Get user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        responses: {
          "200": {
            description: "User retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["user"],
        description: "Update user by id",
        summary: "Update user by id",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  password: {
                    $ref: "#/components/schemas/password"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{userId}/generator": {
      get: {
        tags: ["user"],
        description: "Get generator of user",
        summary: "Get generator of user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        responses: {
          "200": {
            description: "Generator retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    generators: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Generator"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["user"],
        description:
          "Create generator. Only one generator per user is supported at the moment",
        summary: "Create generator for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  limit: {
                    $ref: "#/components/schemas/limit"
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Generator created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Generator"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          },
          "403": {
            description:
              "A generator already exists for the user. Either update or delete the existing generator",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{userId}/generator/{generatorId}": {
      get: {
        tags: ["user"],
        description: "Get generator by id",
        summary: "Get specific generator for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          },
          {
            in: "path",
            name: "generatorId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of generator"
          }
        ],
        responses: {
          "200": {
            description: "Generator retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Generator"
                }
              }
            }
          },
          "404": {
            description: "Generator not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["user"],
        description: "Update generator by id",
        summary: "Update specific generator for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          },
          {
            in: "path",
            name: "generatorId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of generator"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  limit: {
                    $ref: "#/components/schemas/limit"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Generator updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Generator"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["user"],
        description: "Delete generator by id",
        summary: "Delete specific generator for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          },
          {
            in: "path",
            name: "generatorId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of generator"
          }
        ],
        responses: {
          "204": {
            description: "Generator deleted successfully",
            content: {
              "application/json": {}
            }
          },
          "404": {
            description: "Preference not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{userId}/generator/next": {
      get: {
        tags: ["user"],
        description:
          "Get next results from generator. If no generator has been created, " +
          "a generator with default limit of 1 will be used. If no preference has " +
          "been created, a preference with default values (price=1, radius=16000, " +
          "location='San Francisco') will be used.",
        summary: "Get next result from generator of user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        responses: {
          "200": {
            description: "Results retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NextResult"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{userId}/preference": {
      get: {
        tags: ["user"],
        description: "Get preference of user",
        summary: "Get preference of user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        responses: {
          "200": {
            description: "Preference retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    preferences: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Preference"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["user"],
        description:
          "Create preference. Only one preference per user is supported at the moment",
        summary: "Create preference for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  radius: {
                    $ref: "#/components/schemas/radius"
                  },
                  price: {
                    $ref: "#/components/schemas/price"
                  },
                  location: {
                    $ref: "#/components/schemas/location"
                  }
                },
                required: ["location"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Preference created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Preference"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          },
          "403": {
            description:
              "A preference already exists for the user. Either update or delete the existing preference",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{userId}/preference/{preferenceId}": {
      get: {
        tags: ["user"],
        description: "Get preference by id",
        summary: "Get specific preference for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          },
          {
            in: "path",
            name: "preferenceId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of preference"
          }
        ],
        responses: {
          "200": {
            description: "Preference retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Preference"
                }
              }
            }
          },
          "404": {
            description: "Preference not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["user"],
        description: "Update preference by id",
        summary: "Update specific preference for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          },
          {
            in: "path",
            name: "preferenceId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of preference"
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  radius: {
                    $ref: "#/components/schemas/radius"
                  },
                  price: {
                    $ref: "#/components/schemas/price"
                  },
                  location: {
                    $ref: "#/components/schemas/location"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Preference updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Preference"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["user"],
        description: "Delete preference by id",
        summary: "Delete specific preference for user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          },
          {
            in: "path",
            name: "preferenceId",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of preference"
          }
        ],
        responses: {
          "204": {
            description: "Preference deleted successfully",
            content: {
              "application/json": {}
            }
          },
          "404": {
            description: "Preference not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      id: {
        type: "string",
        example: "5d9ec308336aac329a80ef32",
        description: "Id to reference the resource"
      },
      username: {
        type: "string",
        example: "Test1234",
        description: "Username must contain at least 8 alphanumeric characters"
      },
      password: {
        type: "string",
        example: "Test1234",
        description: "Password must contain at least 8 alphanumeric characters"
      },
      limit: {
        type: "integer",
        example: 1,
        description:
          "Controls how many results are returned in the call to next. Default is 1"
      },
      radius: {
        type: "integer",
        example: 16000,
        description:
          "Sets the max distance of how far to search for businesses. Value is measured in meters"
      },
      price: {
        type: "integer",
        example: 1,
        description:
          "Controls how expensive the businesses are on a scale of 1 through 4 from cheap to expensive"
      },
      location: {
        type: "string",
        example: "San Francisco",
        description:
          "Sets the location to look for businesses. Value can be an address. Examples: 'New York City', 'NYC', '350 5th Ave, New York, NY 10118'"
      },
      token: {
        type: "string",
        properties: {
          token: {
            type: "string"
          }
        },
        example: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGE3Y2M0YjM2NTJhNjBlNGJhYzRjNjkiLCJpYXQiOjE1NzMwOTg0OTZ9.G0edLhKTypW27UAAN17PpkajP84XG1DTcXk5wXrDFJY"
        },
        description:
          "Token returned from a successful login. This token is required to access protected endpoints. It should be included as a Bearer Authorization header of the request"
      },
      error: {
        type: "object",
        properties: {
          error: {
            type: "string"
          }
        },
        example: { error: "an explanation of the error" },
        description: "An error message"
      },
      User: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/id"
          },
          username: {
            $ref: "#/components/schemas/username"
          }
        },
        description: "Represents a registered user"
      },
      Generator: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/id"
          },
          limit: {
            $ref: "#/components/schemas/limit"
          }
        },
        description: "Controls the retrieval of business data"
      },
      NextResult: {
        type: "object",
        properties: {
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rating: {
                  type: "number"
                },
                price: {
                  type: "number"
                },
                name: {
                  type: "string"
                },
                location: {
                  type: "object",
                  properties: {
                    address1: {
                      type: "string"
                    },
                    address2: {
                      type: "string"
                    },
                    address3: {
                      type: "string"
                    },
                    city: {
                      type: "string"
                    },
                    zip_code: {
                      type: "string"
                    },
                    country: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    display_address: {
                      type: "array",
                      items: {
                        type: "string"
                      }
                    }
                  }
                },
                categories: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      alias: {
                        type: "string"
                      },
                      title: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        example: {
          results: [
            {
              rating: 4,
              price: "$",
              name: "Sophie's Crepes",
              location: {
                address1: "1581 Webster St",
                address2: "Ste 275",
                address3: "",
                city: "San Francisco",
                zip_code: "94115",
                country: "US",
                state: "CA",
                display_address: [
                  "1581 Webster St",
                  "Ste 275",
                  "San Francisco, CA 94115"
                ]
              },
              categories: [
                {
                  alias: "desserts",
                  title: "Desserts"
                },
                {
                  alias: "creperies",
                  title: "Creperies"
                }
              ]
            }
          ]
        },
        description: "Business data retrieved in latest retrieval"
      },
      Preference: {
        type: "object",
        properties: {
          id: {
            $ref: "#/components/schemas/id"
          },
          radius: {
            $ref: "#/components/schemas/radius"
          },
          price: {
            $ref: "#/components/schemas/price"
          },
          location: {
            $ref: "#/components/schemas/location"
          },
          userId: {
            $ref: "#/components/schemas/id"
          }
        },
        description: "Controls what business information should be retrieved"
      }
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    }
  }
};
