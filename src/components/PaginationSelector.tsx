import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationSelector({
  page,
  pages,
  onPageChange,
}: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
       {
        //if we are on the first page then this won't display
        page !== 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
          </PaginationItem>
        )
       }
        
        {pageNumbers.map((pageNumber) => (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(pageNumber)}
              isActive={pageNumber === page}
              className="w-8"
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {
         //if we are on the last page then this won't display
         page !== pageNumbers.length && (
          <PaginationItem>
           <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
         )
        }
      </PaginationContent>
    </Pagination>
  );
}
