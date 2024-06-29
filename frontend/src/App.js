import AppRoutes from "./routes";

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return JSON.parse(value);
};

function App() {
    return <AppRoutes />;
}

export default App;
