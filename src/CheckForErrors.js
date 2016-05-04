
$(function () {
    var projIds = new Array();
    projIds = getAllProjectIds();
    for (var i = 0; i < projIds.length; i++) {
        testProjectIds(projIds[i]);
    }
});

function getAllProjectIds() {
    var cnn = new Connection();
    var query = "select distinct project_id from pplters";
    var projectIds = new Array();

    cnn.open()
    var rs = cnn.execute(query);
    if (!rs.EOF) {
        rs.MoveFirst();
        while (!rs.EOF) {
            var projStr = '';
            projStr += rs.fields("project_id");
            projectIds.push(projStr);
            rs.MoveNext();
        }
    }

    rs.Close();
    cnn.close();
    return projectIds;
}

function testProjectIds(projId) {
    try {
        var cnn = new Connection();
        var query = "select * from pplvfacc where project_id = '" + projId + "' ";

        cnn.open()
        var rs = cnn.execute(query);
        if (!rs.EOF) {
            $("#goodStuff").append("<br />" + projId);
        }
        rs.Close();
        cnn.close();
    }
    catch (ex) {
        $("#display").append("<br />Bad:  " + projId);
        cnn.close();
    }
}

function Connection() {
    this.cnn = new ActiveXObject('ADODB.Connection');
    this.cnnStr = "Provider=msdaora;Data Source=host;User id=user;Password=pass";

    this.open = function () {
        this.cnn.Open(this.cnnStr)
    }

    this.close = function () {
        this.cnn.Close();
    }

    this.execute = function (query) {
        var rs = this.cnn.Execute(query);
        return rs;
    }
}

