export default function FilterToggle({
  visible,
  active,
  onClear,
  onApply,
}: {
  visible: boolean;
  active: boolean;
  onClear: () => void;
  onApply: () => void;
}) {
  if (active) {
    return (
      <button onClick={onClear} className="btn ph3 pv1 br3 f6 ba b--moon-gray">
        Limpar filtro
      </button>
    );
  }

  if (visible) {
    return (
      <button onClick={onApply} className="btn ph3 pv1 br3 f6 ba b--moon-gray">
        Aplicar filtro
      </button>
    );
  }

  return null;
}
