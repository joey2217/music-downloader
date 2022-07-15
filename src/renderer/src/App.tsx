function App() {
  return (
    <div className="App">
      <h1>Versions</h1>
      <h2>chrome:{window.versions.chrome}</h2>
      <h2>node:{window.versions.node}</h2>
      <h2>electron:{window.versions.electron}</h2>
    </div>
  );
}

export default App;
