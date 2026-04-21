"use client";
import { useBuilder } from "@/stores/surveyBuilder";
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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Copy, Trash2, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/firebase/schema";

export function QuestionList() {
  const survey = useBuilder((s) => s.survey);
  const selectedQuestionId = useBuilder((s) => s.selectedQuestionId);
  const select = useBuilder((s) => s.select);
  const reorderQuestions = useBuilder((s) => s.reorderQuestions);
  const removeQuestion = useBuilder((s) => s.removeQuestion);
  const duplicateQuestion = useBuilder((s) => s.duplicateQuestion);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = survey.questions.findIndex((q) => q.id === e.active.id);
    const to = survey.questions.findIndex((q) => q.id === e.over!.id);
    if (from >= 0 && to >= 0) reorderQuestions(from, to);
  };

  if (survey.questions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Settings2 className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">왼쪽에서 문항을 추가하세요</h2>
          <p className="text-slate-600 text-sm">
            객관식, 리커트, 주관식 등 11가지 문항 타입을 지원합니다. 검증된 교육용 템플릿에서
            시작할 수도 있어요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={survey.questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {survey.questions.map((q, idx) => (
              <SortableQuestionCard
                key={q.id}
                question={q}
                index={idx}
                selected={selectedQuestionId === q.id}
                onSelect={() => select(q.id)}
                onDuplicate={() => duplicateQuestion(q.id)}
                onRemove={() => removeQuestion(q.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableQuestionCard({
  question,
  index,
  selected,
  onSelect,
  onDuplicate,
  onRemove,
}: {
  question: Question;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: question.id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={cn(
        "group bg-white border rounded-xl p-4 cursor-pointer transition-all",
        selected && "ring-2 ring-indigo-500 shadow-lg",
        !selected && "hover:border-indigo-300"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 opacity-0 group-hover:opacity-100 cursor-grab"
          aria-label="순서 변경"
        >
          <GripVertical className="h-4 w-4 text-slate-400" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-slate-500">Q{index + 1}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
              {question.type}
            </span>
            {question.required && <span className="text-xs text-red-500">*필수</span>}
          </div>
          <p className="font-medium truncate">{question.title}</p>
          {question.options && (
            <p className="text-xs text-slate-500 mt-1">선택지 {question.options.length}개</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-1.5 rounded hover:bg-slate-100"
            aria-label="복제"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 rounded hover:bg-red-100 hover:text-red-600"
            aria-label="삭제"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
