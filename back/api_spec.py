"""OpenAPI v3 Specification"""

# apispec via OpenAPI
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from marshmallow import Schema, fields

# Create an APISpec
spec = APISpec(
    title="ReTex API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)

# Define schemas
class InputSchema1(Schema):
    #number = fields.Int(description="An integer.", required=True)
    url = fields.String(description="URL to Git Repository", required=True,example="https://github.com/EtangDesApplis/ReTeX.git")
    main = fields.String(description="Main tex file", required=True, example="test/cv_homer.tex")

class OutputSchema1(Schema):
    Status = fields.String(description="A message.", required=True)
    OutputFile = fields.String(description="A message.", required=True)
    LogFile = fields.String(description="A message.", required=True)

class OutputSchema2(Schema):
    Status = fields.String(description="A message.", required=True)

# register schemas with spec
#spec.components.schema("Input", schema=InputSchema)
#spec.components.schema("Output", schema=OutputSchema)

# add swagger tags that are used for endpoint annotation
tags = [
            {'name': 'Health check',
             'description': 'For testing the API.'
            },
            {'name': 'Compilation',
             'description': 'Compile PDF from LaTex git repo'
            },
       ]

for tag in tags:
    spec.tag(tag)