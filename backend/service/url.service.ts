import { Url } from "@prisma/client";
import prisma from "../../packages/prisma";
import { ValidationError } from '../../packages/error-handler';
import { nanoid } from 'nanoid';


export interface ShortenUrlPayload {
    originalUrl: string;
}

export interface UpdateUrlPayload {
    originalUrl: string;
}

class UrlService {
    private async generateUniqueShortCode(): Promise<string> {
        // Generate a short code with 8 characters using nanoid
        const shortCode = nanoid(8);
        return shortCode;
    }

    async getOriginalUrl(shortCode: string): Promise<string> {
        // Find the URL with the given short code
        const url = await prisma.url.findUnique({
            where: { shortCode },
        });

        // If the URL is not found, throw an error
        if (!url) {
            throw new ValidationError("URL not found");
        }

        // Increment the access count
        await prisma.url.update({
            where: { id: url.id },
            data: { accessCount: { increment: 1 } },
        });

        return url.originalUrl;
    }

    async getUrlStats(shortCode: string): Promise<Url> {
        //Find the URL with the given short code
        const url = await prisma.url.findUnique({
            where: { shortCode },
        });

        //If the URL is not found, throw an error
        if (!url) {
            throw new ValidationError("URL not found");
        }

        return url;
    }

    async shortenUrl(payload: ShortenUrlPayload): Promise<Url> {
        //Get the original URL from the payload
        const { originalUrl } = payload;

        //If the original URL is not found, throw an error
        if (!originalUrl) {
            throw new ValidationError("Original URL is required");
        }

        //Check if the URL already exists in the database
        const existingUrl = await prisma.url.findFirst({
            where: { originalUrl },
        });

        //If it exists, return the existing short code instead of creating a new one
        if (existingUrl) {
            return existingUrl;
        }

        //Generate a unique short code
        const shortCode = await this.generateUniqueShortCode();

        //Create the URL
        return prisma.url.create({
            data: {
                originalUrl,
                shortCode,
            },
        });
    }

    async updateUrl(shortCode: string, payload: UpdateUrlPayload): Promise<Url> {
        //Get the original URL from the payload
        const { originalUrl } = payload;

        //Find the URL with the given short code
        const url = await prisma.url.findUnique({ where: { shortCode } });

        //If the URL is not found, throw an error
        if (!url) {
            throw new ValidationError("URL not found");
        }

        //Update the URL
        const updatedUrl = await prisma.url.update({
            where: { id: url.id },
            data: { originalUrl },
        });

        return updatedUrl;
    }

    async deleteUrl(shortCode: string): Promise<void> {
        //Find the URL with the given short code
        const url = await prisma.url.findUnique({ where: { shortCode } });

        //If the URL is not found, throw an error
        if (!url) {
            throw new ValidationError("URL not found");
        }

        //Delete the URL
        await prisma.url.delete({
            where: { id: url.id },
        });
    }
}

export default new UrlService();