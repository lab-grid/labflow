import uvicorn

from server import app

import api.health
import api.user
import api.group
import api.protocol
import api.run
import api.sample
import graphql_api


if __name__ == "__main__":
    uvicorn.run(app)
