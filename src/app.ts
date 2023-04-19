async function setObjecttoForm(editor: any, id: any) {
  const objectData = await loadObject(id);
  editor.setValue(objectData);
  globalThis.historyData = objectData;
  return objectData;
}

function setObjectHistory(data: any, id: any) {
  console.log(Date.now());
  const timestamp = Date.now();
  const keyHistory = "api/rest/v1/object/" + id + "/history/"+timestamp+".json";
  patchObjecttoS3(keyHistory, data);
}

function uploadObjecttoS3(data: any, id: any) {
  const key = "api/rest/v1/object/" + id + ".json";
  console.log(data);
  patchObjecttoS3(key, data);
}

async function setObject(editor: any, id: any) {
  const objectData = await loadObject(id);
  editor.setValue(objectData);
  return objectData;
}

function getValueEditor(data: any) {
  console.log("Get Value");
  console.log(data);
  return data;
}

var historyData = null;

function main() {
  var url = new URL(document.URL);
  console.log(url.pathname);
  console.log(url.search);
  var params = url.searchParams;
  console.log(params);
  console.log(params.get("id"));

  if (url.pathname === "/object/") {
    console.log("Set JSONEditor");
    var editor = loadJSONEditor();
    var historyData = null;
    //addEventListener();
    var id : any = null;
    if (params.get("id") === "new") {
      console.log("id is new");
      id = self.crypto.randomUUID();
    } else {
      console.log("id is not new");
      console.log(params.get("id"));
      id = params.get("id");
      setObjecttoForm(editor, params.get("id"));
    }

    const input = document.getElementById('submit') as HTMLInputElement | null;
    if (input) {
      input.addEventListener('click', () => {
        console.log("Submit button clicked");
        console.log(Date.now());
        console.log(editor.getValue());
        var data = editor.getValue();
        uploadObjecttoS3(data, id);
        setObjectHistory(data, id);
      });
    }
    
    if (params.get("id") === "new") {
      console.log("id is new");
    } else {
      console.log("id is not new");
      console.log(params.get("id"));
      setObjecttoForm(editor, params.get("id"));
    }
    //getValueEditor(editor);
  }
}

main();