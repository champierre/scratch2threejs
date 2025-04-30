class ThreeJSExtension {
    constructor() {
        this.cubes = [];
    }

    getInfo() {
        return {
            id: 'threejs',
            name: 'Three.js',
            blocks: [
                {
                    opcode: 'addCube',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '立方体を追加 サイズ [SIZE] 色 [COLOR] 位置 X [X] Y [Y] Z [Z]',
                    arguments: {
                        SIZE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        },
                        COLOR: {
                            type: Scratch.ArgumentType.COLOR,
                            defaultValue: '#ff0000'
                        },
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'removeAllCubes',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'すべての立体を削除'
                }
            ]
        };
    }

    addCube(args) {
        const size = args.SIZE;
        const color = args.COLOR;
        const x = args.X;
        const y = args.Y;
        const z = args.Z;
        
        // Three.jsのシーンに立方体を追加する処理
        const cube = {
            size: size,
            color: color,
            position: { x: x, y: y, z: z },
            rotation: { x: 0, y: 0, z: 0 }
        };
        
        this.cubes.push(cube);
        
        // MCPサーバーにリクエストを送信
        fetch('http://localhost:3000/api/cubes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cube)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cube added:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    removeAllCubes() {
        // ローカルの配列をクリア
        this.cubes = [];
        
        // MCPサーバーにリクエストを送信
        fetch('http://localhost:3000/api/cubes', {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('All cubes removed:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

Scratch.extensions.register(new ThreeJSExtension());