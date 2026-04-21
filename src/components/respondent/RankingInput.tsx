"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Option } from "@/lib/firebase/schema";

export function RankingInput({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [order, setOrder] = useState<string[]>(
    value.length === options.length ? value : options.map((o) => o.id)
  );

  useEffect(() => {
    onChange(order);
  }, [order, onChange]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = order.indexOf(String(e.active.id));
    const to = order.indexOf(String(e.over.id));
    if (from >= 0 && to >= 0) setOrder(arrayMove(order, from, to));
  };

  const labelById = new Map(options.map((o) => [o.id, o.label]));

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {order.map((id, i) => (
            <SortableRankItem key={id} id={id} index={i + 1} label={labelById.get(id) ?? ""} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRankItem({ id, index, label }: { id: string; index: number; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-white border rounded-xl"
    >
      <span className="font-bold text-indigo-600 w-6">{index}</span>
      <span className="flex-1">{label}</span>
      <button {...attributes} {...listeners} className="cursor-grab" aria-label="순서 변경">
        <GripVertical className="h-5 w-5 text-slate-400" />
      </button>
    </div>
  );
}
