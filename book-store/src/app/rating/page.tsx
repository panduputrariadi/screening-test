"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DropDownAuthor } from "../../../controller/AuthorController";
import { DropDownBookByID } from "../../../controller/BookController";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CreateRating, createRatingSchema } from "../../../schema/RatingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostRating } from "../../../controller/RatingController";
import { toast } from "sonner";

interface Author {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  authorId: number;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const handler = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

const RatingPage = () => {
  const queryClient = useQueryClient();
  const formRating = useForm<CreateRating>({
    resolver: zodResolver(createRatingSchema),
    defaultValues: {
      book_id: 0,
      author_id: 0,
      rating: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: PostRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rating"] });
      formRating.reset();
      toast.success("Rating Berhasil Ditambahkan");
    },

    onError: () => {
      toast.error("Rating Gagal Ditambahkan");
    },
  });

  const onSubmit = (data: CreateRating) => {
    mutate(data);
  };

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const [bookSearch, setBookSearch] = useState("");
  const debouncedBookSearch = useDebounce(bookSearch, 300);

  const [open, setOpen] = useState(false);
  const [openBook, setOpenBook] = useState(false);

  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  // Authors
  const { data: dropdownAuthor = [], isLoading } = useQuery<Author[]>({
    queryKey: ["author-dropdown", debouncedSearchValue],
    queryFn: () => DropDownAuthor(debouncedSearchValue),
    staleTime: 0,
  });

  // Books
  const { data: dropdownBook = [], isLoading: isLoadingBook } = useQuery<
    Book[]
  >({
    queryKey: ["book-dropdown", selectedAuthorId, debouncedBookSearch],
    queryFn: () => DropDownBookByID(selectedAuthorId, debouncedBookSearch),
    enabled: !!selectedAuthorId,
    staleTime: 0,
  });

  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardContent>
          <form onSubmit={formRating.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Author Select */}
              <div className="grid gap-2">
                <Label>Book Author</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {selectedAuthorId
                        ? dropdownAuthor.find(
                            (author) => author.id === Number(selectedAuthorId)
                          )?.name
                        : "Select Author..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search author..."
                        onValueChange={setSearchValue}
                      />
                      <CommandList>
                        {isLoading ? (
                          <CommandEmpty>Loading...</CommandEmpty>
                        ) : dropdownAuthor.length === 0 ? (
                          <CommandEmpty>No author found.</CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {dropdownAuthor.map((author) => (
                              <CommandItem
                                key={author.id}
                                value={author.name} // pencarian by name
                                onSelect={() => {
                                  setSelectedAuthorId(author.id.toString()); // simpan id
                                  formRating.setValue("author_id", author.id);
                                  setSelectedBookId(""); // reset book ketika author berubah
                                  setOpen(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedAuthorId === author.id.toString()
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {author.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <Label>
                Book name will be shown here if you select an author
              </Label>

              {/* Book Select */}
              {selectedAuthorId && (
                <div className="grid gap-2">
                  <Label>Book Name</Label>
                  <Popover open={openBook} onOpenChange={setOpenBook}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openBook}
                        className="w-[200px] justify-between"
                      >
                        {selectedBookId
                          ? dropdownBook.find(
                              (book) => book.id === Number(selectedBookId)
                            )?.title
                          : "Select Book..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search book..."
                          onValueChange={setBookSearch}
                        />
                        <CommandList>
                          {isLoadingBook ? (
                            <CommandEmpty>Loading...</CommandEmpty>
                          ) : dropdownBook.length === 0 ? (
                            <CommandEmpty>No book found.</CommandEmpty>
                          ) : (
                            <CommandGroup>
                              {dropdownBook.map((book) => (
                                <CommandItem
                                  key={book.id}
                                  value={book.title} // pencarian by title
                                  onSelect={() => {
                                    setSelectedBookId(book.id.toString());
                                    formRating.setValue("book_id", book.id);
                                    setOpenBook(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedBookId === book.id.toString()
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {book.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Rating */}
              <div className="grid gap-2">
                <Label>Rating</Label>
                <Input
                  type="number"
                  step="0.01"
                  max={10}
                  placeholder="Enter a number"
                  // {...formRating.register("rating")}
                    {...formRating.register("rating", { valueAsNumber: true })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-10">
              Submit
            </Button>
          </form>
        </CardContent>

        {/* <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default RatingPage;
