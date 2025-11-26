export default {
  title: 'Componentes/Atividade',
};

export const Padrao = () => `
  <div style="font-family: sans-serif; max-width: 360px;">
    <div class="atividade-item" style="display:flex;justify-content:space-between;align-items:center;padding:8px;border:1px solid #eee;border-radius:6px;">
      <div class="atividade-info">
        <span class="atividade-titulo">Estudar JavaScript</span>
        <div class="atividade-hora">09:00 - 10:30</div>
      </div>
      <button class="btn-delete">🗑️</button>
    </div>
  </div>
`;
