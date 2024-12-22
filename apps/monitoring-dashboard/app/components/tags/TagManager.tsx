"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tags, Plus, X } from "lucide-react";
import { popularTags } from "@/app/lib/mock-data";
import { Tag } from "@/app/lib/types";

export function TagManager() {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(popularTags);

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { name: newTag, count: 0 }]);
      setNewTag("");
    }
  };

  const removeTag = (tagName: string) => {
    setTags(tags.filter((tag) => tag.name !== tagName));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Tags className="mr-2 h-5 w-5" />
          Tag Management
        </h2>
      </div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add new tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addTag}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {tags.map((tag) => (
          <div
            key={tag.name}
            className="flex items-center justify-between bg-muted p-3 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{tag.count}</Badge>
              <span className="font-medium">{tag.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTag(tag.name)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}