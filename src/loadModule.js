let swcWasm;
try {
    swcWasm = require('@swc/wasm');
} catch (error) {
    console.error('Error al requerir "@swc/wasm":', error);
    // Manejar el error según sea necesario
}

export default swcWasm