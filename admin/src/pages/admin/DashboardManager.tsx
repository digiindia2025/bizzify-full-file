import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { MoreHorizontal, Move, Pencil, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dashboardCardTemplates, { DashboardCardTemplate } from "../data/dashboardCards";

const DashboardManager = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<DashboardCardTemplate[]>([]);
  const [editingCard, setEditingCard] = useState<DashboardCardTemplate | null>(null);

  useEffect(() => {
    const savedCards = localStorage.getItem("dashboardCards");
    setCards(savedCards ? JSON.parse(savedCards) : dashboardCardTemplates);
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem("dashboardCards", JSON.stringify(cards));
    }
  }, [cards]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedCards = Array.from(cards);
    const [movedCard] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, movedCard);
    setCards(reorderedCards);
  };

  const toggleCardVisibility = (index: number) => {
    const updated = [...cards];
    updated[index].visible = !updated[index].visible;
    setCards(updated);
  };

  const updateCard = (updatedCard: DashboardCardTemplate) => {
    setCards(prev =>
      prev.map(card => (card.key === updatedCard.key ? updatedCard : card))
    );
    setEditingCard(null);
    toast({
      title: "Card Updated",
      description: `${updatedCard.title} has been updated successfully.`,
    });
  };

  const saveChanges = () => {
    localStorage.setItem("dashboardCards", JSON.stringify(cards));
    toast({
      title: "Dashboard Updated",
      description: "Your dashboard layout has been saved successfully.",
    });
    navigate("/admin/dashboard");
  };

  const resetToDefaults = () => {
    setCards(dashboardCardTemplates);
    localStorage.removeItem("dashboardCards");
    toast({
      title: "Dashboard Reset",
      description: "Dashboard has been reset to default settings.",
    });
  };

  const gradientOptions = [
    { value: "bg-gradient-to-r from-blue-500 to-blue-700", label: "Blue" },
    { value: "bg-gradient-to-r from-purple-500 to-purple-700", label: "Purple" },
    { value: "bg-gradient-to-r from-green-500 to-green-700", label: "Green" },
    { value: "bg-gradient-to-r from-red-500 to-red-700", label: "Red" },
    { value: "bg-gradient-to-r from-indigo-500 to-indigo-700", label: "Indigo" },
    { value: "bg-gradient-to-r from-yellow-500 to-yellow-700", label: "Yellow" },
    { value: "bg-gradient-to-r from-pink-500 to-pink-700", label: "Pink" },
    { value: "bg-gradient-to-r from-teal-500 to-teal-700", label: "Teal" },
    { value: "bg-gradient-to-r from-orange-500 to-orange-700", label: "Orange" },
    { value: "bg-gradient-to-r from-cyan-500 to-cyan-700", label: "Cyan" },
    { value: "bg-gradient-to-r from-lime-500 to-lime-700", label: "Lime" },
    { value: "bg-gradient-to-r from-amber-500 to-amber-700", label: "Amber" },
  ];

  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  return (
    <AdminLayout title="Dashboard Manager">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Dashboard Cards</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={saveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {editingCard && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Card: {editingCard.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setEditingCard(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Card Title</Label>
                <Input
                  id="title"
                  value={editingCard.title}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, title: e.target.value })
                  }
                  className="mb-4"
                />

                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editingCard.description}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, description: e.target.value })
                  }
                  className="mb-4"
                />

                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="visible"
                    checked={editingCard.visible}
                    onCheckedChange={(checked) =>
                      setEditingCard({ ...editingCard, visible: checked as boolean })
                    }
                  />
                  <Label htmlFor="visible">Visible on Dashboard</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="color">Card Color</Label>
                <Select
                  value={editingCard.colorClass}
                  onValueChange={(value) =>
                    setEditingCard({ ...editingCard, colorClass: value })
                  }
                >
                  <SelectTrigger className="mb-4">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 mr-2 rounded ${opt.value}`} />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label htmlFor="size">Card Size</Label>
                <Select
                  value={editingCard.size || "medium"}
                  onValueChange={(value) =>
                    setEditingCard({ ...editingCard, size: value as "small" | "medium" | "large" })
                  }
                >
                  <SelectTrigger className="mb-4">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => updateCard(editingCard)}>
                <Save className="mr-2 h-4 w-4" />
                Save Card
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {cards.map((card, index) => (
                <Draggable key={card.key} draggableId={card.key} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`flex items-center bg-white p-4 rounded-lg border ${
                        !card.visible ? "opacity-50" : ""
                      }`}
                    >
                      <div {...provided.dragHandleProps} className="mr-4">
                        <Move className="h-5 w-5 text-gray-400" />
                      </div>
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${card.colorClass}`}
                      >
                        {(() => {
                          const Icon = card.icon;
                          return <Icon className="h-5 w-5 text-white" />;
                        })()}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{card.title}</h3>
                        <p className="text-sm text-gray-500">{card.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCardVisibility(index)}
                        >
                          {card.visible ? "Hide" : "Show"}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingCard(card)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </AdminLayout>
  );
};

export default DashboardManager;
