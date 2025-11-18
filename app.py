from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Dados simulados
usuarios = []
atividades = []

@app.route('/api/usuarios', methods=['GET', 'POST'])
def handle_usuarios():
    if request.method == 'GET':
        return jsonify(usuarios)
    elif request.method == 'POST':
        novo_usuario = request.json
        novo_usuario['id'] = len(usuarios) + 1
        usuarios.append(novo_usuario)
        return jsonify(novo_usuario), 201

@app.route('/api/atividades', methods=['GET', 'POST'])
def handle_atividades():
    if request.method == 'GET':
        usuario_id = request.args.get('usuario_id')
        if usuario_id:
            return jsonify([a for a in atividades if str(a.get('usuario_id')) == usuario_id])
        return jsonify(atividades)
    elif request.method == 'POST':
        nova_atividade = request.json
        nova_atividade['id'] = len(atividades) + 1
        atividades.append(nova_atividade)
        return jsonify(nova_atividade), 201

@app.route('/api/atividades/<int:id>', methods=['DELETE'])
def deletar_atividade(id):
    global atividades
    atividades = [a for a in atividades if a.get('id') != id]
    return jsonify({'message': 'Atividade deletada'}), 200

@app.route('/api/relatorio', methods=['GET'])
def gerar_relatorio():
    usuario_id = request.args.get('usuario_id')
    minhas_atividades = [a for a in atividades if str(a.get('usuario_id')) == usuario_id]
    
    categorias = {}
    for atividade in minhas_atividades:
        nome = atividade.get('nome', '').lower()
        if 'trabalho' in nome:
            categorias['Trabalho'] = categorias.get('Trabalho', 0) + 1
        elif 'estudo' in nome or 'aula' in nome:
            categorias['Estudos'] = categorias.get('Estudos', 0) + 1
        elif 'exercício' in nome or 'esporte' in nome:
            categorias['Exercício'] = categorias.get('Exercício', 0) + 1
        elif 'lazer' in nome or 'filme' in nome:
            categorias['Lazer'] = categorias.get('Lazer', 0) + 1
        else:
            categorias['Outros'] = categorias.get('Outros', 0) + 1
    
    return jsonify({
        'total_atividades': len(minhas_atividades),
        'categorias': categorias
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
