module.exports = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "some cool project",
    description: "a cool project",
    contact: {
      name: "Terry Xie",
      email: "txie92@gmail.com"
    }
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local API v1 Server"
    }
  ],
  paths: {
    "/me": {
      get: {
        tags: ["me"],
        description: "Get current user",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["me"],
        description: "Update current user",
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
                  $ref: "#/components/schemas/Error"
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
        security: [{ BearerAuth: [] }],
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
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["me"],
        description: "Create preference for current user",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  rating: {
                    $ref: "#/components/schemas/rating"
                  },
                  distance: {
                    $ref: "#/components/schemas/distance"
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
                  $ref: "#/components/schemas/Error"
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
        security: [{ BearerAuth: [] }],
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
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["me"],
        description: "Create generator",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/me/generator/next": {
      get: {
        tags: ["user"],
        description: "Get next result from generator",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Next Generator result retrieved successfully",
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
                  $ref: "#/components/schemas/Error"
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
                  $ref: "#/components/schemas/Session"
                }
              }
            }
          },
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
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
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "Users retrieved successfully",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["user"],
        description: "Create user",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{id}": {
      get: {
        tags: ["user"],
        description: "Get user by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
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
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["user"],
        description: "Update user by id",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{id}/generator": {
      get: {
        tags: ["user"],
        description: "Get generator",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["user"],
        description: "Create generator",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{id}/generator/next": {
      get: {
        tags: ["user"],
        description: "Get next result from generator",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              $ref: "#/components/schemas/id"
            },
            description: "id of user"
          }
        ],
        responses: {
          "200": {
            description: "Next Generator result retrieved successfully",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{id}/preference": {
      get: {
        tags: ["user"],
        description: "Get preference",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["user"],
        description: "Create preference",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
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
                  rating: {
                    $ref: "#/components/schemas/rating"
                  },
                  distance: {
                    $ref: "#/components/schemas/distance"
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
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/user/{id}/preference/{preferenceId}": {
      get: {
        tags: ["user"],
        description: "Get preference by id",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
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
          "400": {
            description: "Invalid request. Refer to the error message.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ["user"],
        description: "Update preference by id",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  rating: {
                    $ref: "#/components/schemas/rating"
                  },
                  distance: {
                    $ref: "#/components/schemas/distance"
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
                  $ref: "#/components/schemas/Error"
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
        example: "5d9ec308336aac329a80ef32"
      },
      username: {
        type: "string",
        example: "TestUser1234"
      },
      password: {
        type: "string",
        example: "TestPassword1234"
      },
      limit: {
        type: "number",
        example: "1"
      },
      rating: {
        type: "integer"
      },
      distance: {
        type: "integer"
      },
      price: {
        type: "integer"
      },
      location: {
        type: "string"
      },
      User: {
        type: "object",
        properties: {
          _id: {
            $ref: "#/components/schemas/id"
          },
          username: {
            $ref: "#/components/schemas/username"
          }
        }
      },
      Session: {
        type: "object",
        properties: {
          token: {
            type: "string"
          }
        }
      },
      Generator: {
        type: "object",
        properties: {
          _id: {
            $ref: "#/components/schemas/id"
          },
          limit: {
            $ref: "#/components/schemas/limit"
          }
        }
      },
      NextResult: {
        type: "object" // TODO: update this
      },
      Preference: {
        type: "object",
        properties: {
          _id: {
            $ref: "#/components/schemas/id"
          },
          rating: {
            $ref: "#/components/schemas/rating"
          },
          distance: {
            $ref: "#/components/schemas/distance"
          },
          price: {
            $ref: "#/components/schemas/price"
          },
          location: {
            $ref: "#/components/schemas/location"
          }
        }
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string"
          }
        }
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
