from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

usuarios = []
reclamacoes = []

# Rota para listar todos os usuários
@app.route('/getall', methods=['GET'])
def lista_usuarios():
    return jsonify(usuarios)

# Rota para obter um usuário pelo email
@app.route('/<email>', methods=['GET'])
def get_usuarios_email(email):
    for usuario in usuarios:
        if usuario['email'] == email:
            return jsonify(usuario)
    return jsonify({"error": "Usuário não encontrado"}), 404

# Rota para adicionar um novo usuário
@app.route('/novo', methods=['POST'])
def add_usuario():
    email_usuario = request.form['email']
    nome_usuario = request.form['nome']
    senha_usuario = int(request.form['senha'])
    for usuario in usuarios:
        if usuario['email'] == email_usuario:
            return jsonify({"message": "Usuário já tem cadastro!"}), 409
    else:
        id = len(usuarios) + 1
        novo_usuario = {"id": id, "email": email_usuario, "senha": senha_usuario, "nome": nome_usuario, "ativo": True}
        usuarios.append(novo_usuario)
        return jsonify({"message": "Usuário cadastrado"}), 201
    

# Rota para alterar status do usuário
@app.route('/status_usuario/<int:id>')
def edt_status_usuario(id):
    for usuario in usuarios:
        if usuario['id'] == id:
            if usuario['ativo'] == True:
                usuario['ativo'] = False
            else:
                usuario['ativo'] = True
    return jsonify({"message": "Status do usuário alterado"}), 201

# Rota para alterar informações do usuário
@app.route('/editar/<int:id>', methods=['PUT'])
def alterar(id):
    email_usuario = request.form['email']
    nome_usuario = request.form['nome']
    senha_usuario = int(request.form['senha'])
    for usuario in usuarios:
        if usuario['id'] == id:
            usuario['email'] = email_usuario
            usuario['nome'] = nome_usuario
            usuario['senha'] = senha_usuario
    return jsonify({"message": "Alterações realizadas"}), 201

# Rota para excluir um usuário
@app.route('/deletar/<int:id>', methods=['DELETE'])
def deletar_usuario(id):
    for usuario in usuarios:
        if usuario['id'] == id:
            usuarios.remove(usuario)
            return jsonify({'message': 'Usuário deletado com sucesso'}), 200
    else:
        return jsonify({'error': 'Usuário não encontrado'}), 404
    
# Rota para listar todas as reclamações
@app.route('/getallreclamacoes', methods=['GET'])
def lista_reclamacoes():
    return jsonify(reclamacoes)

# Rota para listar todas as reclamações do mesmo email fornecido na URL
@app.route('/getallreclama', methods=['GET'])
def lista_reclamacoes_por_email():
    email = request.args.get('email')
    if email:
        reclamacoes_por_email = [reclamacao for reclamacao in reclamacoes if reclamacao['email'] == email]
        return jsonify(reclamacoes_por_email)
    else:
        return jsonify({"error": "Email não fornecido"}), 400


#Rota para listar apenas as reclamacoes solicitadas pela ID
@app.route('/getreclama', methods=['GET'])
def get_reclamacoes():
    id = request.args.get('id')
    if id:
        for reclamacao in reclamacoes:
            if reclamacao['id'] == int(id):
                return jsonify(reclamacao)
        return jsonify({"error": "Reclamação não encontrada"}), 404
    else:
        return jsonify({"error": "ID não fornecido"}), 400
    

# Rota para listar todas as reclamações e verificar resposta do usuário por ID
@app.route('/getallreclamacoes/<int:id>', methods=['PUT'])
def getall_reclamacoes(id):
    id = int(id)
    for reclamacao in reclamacoes:
        if reclamacao['id'] == int(id):
            reclamacao['resposta_reclamacao'] = request.form['resposta-empresa']
            return jsonify({"message": "Resposta da empresa adicionada à reclamação"}), 200
    return jsonify({"error": "Reclamação não encontrada"}), 404

# Rota para obter uma reclamação pelo assunto
@app.route('/reclamacao/<assunto>', methods=['GET'])
def get_reclamacao(assunto):
    for reclamacao in reclamacoes:
        if reclamacao['assunto'] == assunto:
            return jsonify(reclamacao)
    return jsonify({"error": "Reclamação não encontrada"}), 404

# Rota para adicionar uma nova reclamação
@app.route('/nova_reclamacao', methods=['POST'])
def add_reclamacao():
    card_name = request.form.get('card-name')
    card_email = request.form.get('card-email')
    assunto_reclamacao = request.form['assunto']
    reclama_reclamacao = request.form['reclama']
    setor_reclamacao = request.form['setor']
    data_hora = datetime.now()
    
    for reclamacao in reclamacoes:
        if reclamacao['assunto'] == assunto_reclamacao:
            return jsonify({"message": "Reclamação já registrada!"}), 409
    else:
        id = len(reclamacoes) + 1
        nova_reclamacao = {"id": id, "assunto": assunto_reclamacao, "reclama": reclama_reclamacao, "setor": setor_reclamacao, 
                           "ano": data_hora.year, "mes": data_hora.month, "dia": data_hora.day, 
                           "hora": data_hora.hour, "minuto": data_hora.minute, "ativo": True, "nome": card_name, "email": card_email, "resposta_reclamacao": " "}
        reclamacoes.append(nova_reclamacao)
        return jsonify({"message": "Reclamação registrada"}), 201


# Rota para alterar status da reclamação
@app.route('/status_reclamacao/<int:id>')
def edt_status_reclamacao(id):
    for reclamacao in reclamacoes:
        if reclamacao['id'] == id:
            reclamacao['ativo'] = not reclamacao['ativo']
            return jsonify({"message": "Status da reclamação alterado"}), 201
    return jsonify({"error": "Reclamação não encontrada"}), 404

# Rota para alterar informações da reclamação
@app.route('/editar_reclamacao/<int:id>', methods=['PUT'])
def alterar_reclamacao(id):
    assunto_reclamacao = request.form['assunto']
    reclama_reclamacao = request.form['reclama']
    for reclamacao in reclamacoes:
        if reclamacao['id'] == id:
            reclamacao['assunto'] = assunto_reclamacao
            reclamacao['reclama'] = reclama_reclamacao
            return jsonify({"message": "Alterações realizadas"}), 201
    return jsonify({"error": "Reclamação não encontrada"}), 404

# Rota para excluir uma reclamação
@app.route('/deletar_reclamacao/<int:id>', methods=['DELETE'])
def deletar_reclamacao(id):
    for reclamacao in reclamacoes:
        if reclamacao['id'] == id:
            reclamacoes.remove(reclamacao)
            return jsonify({'message': 'Reclamação excluída com sucesso'}), 200
    return jsonify({'error': 'Reclamação não encontrada'}), 404
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
