// Initialize the editor with a JSON schema

function loadJSONEditor() {
    //@ts-ignore
    return new JSONEditor(document.getElementById('editor_holder'), {
        schema: {
            type: "object",
            title: "Object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1,
                    title: "Name",
                },
                "location": {
                    "type": "object",
                    "title": "Location",
                    "properties": {
                        "city": {
                            "type": "string",
                            "default": "San Francisco"
                        },
                        "state": {
                            "type": "string",
                            "default": "CA"
                        },
                        "citystate": {
                            "type": "string",
                            "description": "This is generated automatically from the previous two fields",
                            "template": "{{city}}, {{state}}",
                            "watch": {
                                "city": "location.city",
                                "state": "location.state"
                            }
                        }
                    }
                },
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "startDate": {
                    "type": "string",
                    "format": "date",
                    "options": {
                        "flatpickr": {}
                    }
                },
                model: {
                    type: "string"
                },
                year: {
                    type: "integer",
                    enum: [
                        1995, 1996, 1997, 1998, 1999,
                        2000, 2001, 2002, 2003, 2004,
                        2005, 2006, 2007, 2008, 2009,
                        2010, 2011, 2012, 2013, 2014
                    ],
                    default: 2008
                },
                safety: {
                    type: "integer",
                    format: "rating",
                    maximum: "5",
                    exclusiveMaximum: false,
                    readonly: false
                }
            }
        }
    });
}


function createObject(path: any, data: any) {
    const appS3Config = getAppS3Config();
    const instanceS3 = new S3StorageService(appS3Config);
    instanceS3.uploadObject(path, data);
}

function patchObjecttoS3(path: any, data: any) {
    const appS3Config = getAppS3Config();
    const instanceS3 = new S3StorageService(appS3Config);
    instanceS3.uploadObject(path, data);
}

async function loadObject(id: any) {
    const response = await fetch("https://opendataspace.sos-ch-dk-2.exo.io/api/rest/v1/object/"+id+"/index.json");
    const jsonData = await response.json();
    return jsonData;
}

async function setValuetoEditor(editor: any, jsonData: any){
    editor.setValue(jsonData);
}

function setS3Object(editor: any, id: any) {
    const key = "api/rest/v1/object/" + id + ".json";
    patchObjecttoS3(key, editor.getValue());
}