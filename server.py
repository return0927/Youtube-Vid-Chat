from flask import Flask, render_template, send_from_directory, request

app = Flask(__name__)
GET = ["GET"]
POST = ["POST"]


class WEB_SETTING():
    def __init__(self):
        self.version = 1

    def getDomain(self, request):
        url = request.url
        return url.replace("http://","")\
            .replace("https://","")\
            .split("/")[0]\
            .split(":")[0]


class API_SETTING():
    def __init__(self):
        self.youtube = "AIzaSyB8cqA34iLlp2IwbuFQ3vOyEBPdV6U_S2A"


class GLOBAL_SETTINGS():
    def __init__(self):
        self.WEB = WEB_SETTING()
        self.API = API_SETTING()


GLOBAL = GLOBAL_SETTINGS()


@app.route("/", methods=GET+POST)
def __web_root():
    vid = request.args.get("vid")
    return render_template("index.html", vid=vid, domain=GLOBAL.WEB.getDomain(request), YoutubeAPIKey = GLOBAL.API.youtube, version=GLOBAL.WEB.version)


@app.route("/css/<path:filename>")
def __web_resources_css(filename):
    return send_from_directory("resources/css/", filename)


@app.route("/js/<path:filename>")
def __web_resources_js(filename):
    return send_from_directory("resources/js/", filename)


app.run("0.0.0.0", 88, debug=True, threaded=True)
